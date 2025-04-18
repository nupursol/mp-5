import getCollection, { URLS_COLLECTION } from "@/db";
import { notFound, redirect } from "next/navigation";

type Params = {
    params: { alias: string };
};

export default async function AliasRedirect({ params }: Params) {
    const collection = await getCollection(URLS_COLLECTION); //get the collection
    const doc = await collection.findOne({ alias: params.alias }); //find the alias  entered
    if (!doc) { // try to find the alias user entered
        notFound();
    }
    // or else redirect to the actual long input URL
    redirect(doc.longUrl);
}