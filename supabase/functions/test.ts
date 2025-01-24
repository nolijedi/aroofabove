// test.ts
import { handleUserMessage } from "../../Supabase/chat.ts";


const testMessage = "master: Update roof type to asphalt";

const test = async () => {
  const response = await handleUserMessage(testMessage);
  console.log(response);
};

test();
