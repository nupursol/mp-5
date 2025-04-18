import getCollection, { URLS_COLLECTION } from "@/db";
import { notFound, redirect } from "next/navigation";

export default async function AliasRedirect({
                                                params,
                                            }: {
    params: { alias: string };
}) {
    console.log("PARAMS", params.alias);

    const collection = await getCollection(URLS_COLLECTION);
    const doc = await collection.findOne({ alias: params.alias });

    if (!doc) {
        notFound();
    }

    redirect(doc.longUrl);
}