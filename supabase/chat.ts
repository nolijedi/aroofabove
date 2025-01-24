// /src/functions/chat.ts
import { supabase } from "../utils/supabase.ts";

// Function to update memory in Supabase
const updateMemoryInSupabase = async (newMemory: string) => {
  try {
    const { data, error } = await supabase
      .from("memory") // Ensure this table exists
      .upsert({ content: newMemory });

    if (error) {
      console.error('Error updating memory:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error during memory update:', error);
    return { success: false, error: error.message };
  }
};

// Example handler for user message
const handleUserMessage = async (message: string) => {
  if (message.startsWith("master:")) {
    const command = message.slice(7).trim(); // Extract the command part
    
    // Update memory with new command
    const result = await updateMemoryInSupabase(`Updated memory: ${command}`);
    
    if (result.success) {
      console.log('Memory updated successfully');
      return "Training updated successfully. I'm now back in normal chat mode. How can I assist you further?";
    } else {
      return `Failed to update memory: ${result.error}`;
    }
  }
  
  // If it's not a master command, just return the message
  return `Normal message received: ${message}`;
};

export { handleUserMessage };
