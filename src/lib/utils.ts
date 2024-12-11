'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache';

export async function searchItemRedirects(ticker : string) {
    revalidatePath(`/analisis/${ticker}`);
    redirect(`/analisis/${ticker}`)
}