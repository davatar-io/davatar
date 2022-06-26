// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqbyygslnzmohwcllypw.supabase.co';
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYnl5Z3Nsbnptb2h3Y2xseXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYyNDA5NzcsImV4cCI6MTk3MTgxNjk3N30.gWI1KY9lsqEH7r4r4AwNWLKkLwzhpN2Rn24XVvkjnmU'
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, url } = req.body;
  console.log(address, url);

  const { data, error } = await supabase
    .from('imageurls')
    .upsert({ address, image_url: url });

  res.status(200).json({});
}
