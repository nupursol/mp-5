"use server";
import getCollection, { URLS_COLLECTION } from "@/db";

//gets the mongo collection for urls from db file
export default async function createUrl(longUrl: string, alias: string) {
    const collection = await getCollection(URLS_COLLECTION);

    //alias validation
    const existing = await collection.findOne({ alias });
    if (alias.includes("/")) {
        throw new Error("Alias cannot contain slashes"); // invalid sign
    }
    if (alias.includes("?")) {
        throw new Error("Alias cannot contain question marks"); //invalid
    }
    if (alias.includes("=")) {
        throw new Error("Alias cannot contain equals sign"); //check if invalid sign
    }
    if (existing) {
        throw new Error("Alias already in use"); //check if unique
    }

    //url validation
    try {
        new URL(longUrl); // basic format validation
        const res = await fetch(longUrl, { method: "HEAD" }); // check if server responds
        if (!res.ok) {
            throw new Error("URL does not respond");
        }
    } catch (err) {
        console.error("Validation fetch failed", err);
        throw new Error("Invalid URL");
    }

    //make a doc to insert
    const doc = {
        alias,
        longUrl,
        createdAt: new Date(), //save timestamp
    };
    const result = await collection.insertOne(doc); // put it in db
    if (!result.acknowledged) {
        throw new Error("Failed to insert URL");
    }

    //get the base url from .env or just localhost fallback - used this for testing pre deployment
    //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return {
        id: result.insertedId.toHexString(),
        shortUrl:` https://mp-5.vercel.app/${alias}`, // our final short url
        longUrl,
    };
}