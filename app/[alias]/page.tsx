import getCollection, { URLS_COLLECTION } from "@/db";
import { notFound, redirect } from "next/navigation";

export default async function AliasRedirect(
    { params }: { params: Promise<{ alias: string }> }
) {
    const { alias } = await params;

    const collection = await getCollection(URLS_COLLECTION);
    const doc = await collection.findOne({ alias });

    if (!doc) {
        notFound();
    }

    redirect(doc.longUrl);
}