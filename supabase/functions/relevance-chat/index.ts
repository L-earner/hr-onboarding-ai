import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId } = await req.json();

    const RELEVANCE_API_KEY = Deno.env.get('RELEVANCE_API_KEY');
    const RELEVANCE_AGENT_ID = Deno.env.get('RELEVANCE_AGENT_ID');
    const RELEVANCE_PROJECT_ID = Deno.env.get('RELEVANCE_PROJECT_ID');
    const RELEVANCE_REGION = Deno.env.get('RELEVANCE_REGION') || 'f1db6c';

    if (!RELEVANCE_API_KEY || !RELEVANCE_AGENT_ID || !RELEVANCE_PROJECT_ID) {
      throw new Error('Relevance AI credentials are not configured');
    }

    // Use proper SDK-style authentication: project:api_key:region
    const authHeader = `${RELEVANCE_PROJECT_ID}:${RELEVANCE_API_KEY}:${RELEVANCE_REGION}`;

    console.log('Sending message to agent:', RELEVANCE_AGENT_ID);

    const response = await fetch(
      `https://api-${RELEVANCE_REGION}.stack.tryrelevance.com/latest/agents/trigger`,
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            role: 'user',
            content: message,
          },
          agent_id: RELEVANCE_AGENT_ID,
          ...(conversationId ? { conversation_id: conversationId } : {}),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Relevance AI API error:', response.status, errorText);
      throw new Error(`Relevance AI API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Relevance AI response:', JSON.stringify(data, null, 2));

    // Extract job info for polling
    const jobInfo = data.job_info;
    const conversationIdFromResponse = data.conversation_id;
    
    if (!jobInfo?.studio_id || !jobInfo?.job_id) {
      console.error('No job info in response');
      return new Response(JSON.stringify({
        answer: 'I received your message but had trouble starting the conversation.',
        conversationId: conversationIdFromResponse,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Poll for the job completion
    const maxAttempts = 30;
    let answer = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const waitMs = 1000 + attempt * 200;
      await new Promise((r) => setTimeout(r, waitMs));

      try {
        const pollResp = await fetch(
          `https://api-${RELEVANCE_REGION}.stack.tryrelevance.com/latest/studios/${jobInfo.studio_id}/async_poll/${jobInfo.job_id}`,
          {
            method: 'GET',
            headers: { 'Authorization': authHeader },
          }
        );

        if (!pollResp.ok) {
          console.warn(`Polling non-200 (attempt ${attempt}):`, pollResp.status);
          continue;
        }

        const pollData = await pollResp.json();
        console.log(`Poll attempt ${attempt}:`, pollData.type, pollData.status);

        // Look for the answer in the response
        if (pollData.type === 'complete' && pollData.updates) {
          // Find the last chain-success update with output
          for (const update of [...pollData.updates].reverse()) {
            if (update.type === 'chain-success' && update.output?.output?.answer) {
              answer = update.output.output.answer;
              console.log('Found answer:', answer);
              break;
            }
          }
          
          if (answer) break;
        }

        // Stop if job failed
        if (pollData.type === 'failed') {
          console.error('Job failed');
          break;
        }
      } catch (e) {
        console.warn(`Polling error (attempt ${attempt}):`, e);
      }
    }

    if (!answer) {
      console.warn('No answer found after polling');
      return new Response(JSON.stringify({
        answer: 'I received your message but had trouble generating a response.',
        conversationId: conversationIdFromResponse,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      answer, 
      conversationId: conversationIdFromResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in relevance-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});


