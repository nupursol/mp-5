"use client";
import { useState } from "react";
import createUrl from "@/lib/createUrl";
import { TextField, Button } from "@mui/material";

export default function ShortenUrl() {
    const [url, setUrl] = useState(""); //hooks
    const [alias, setAlias] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    return (
        <div className=" flex justify-center items-center w-full">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-150 "
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        // try to create short url using user input
                        const res = await createUrl(url, alias);
                        setResult(res.shortUrl);
                        setError(null); // clear error if success
                    } catch (err) {
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError("An unknown error occurred"); // catch all error msg
                        }
                        setResult(null);
                    }
                }}
            >
                <TextField label="URL" variant="outlined" fullWidth value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    margin="normal"
                />
                <TextField label="Custom Alias" variant="outlined" fullWidth value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    margin="normal"
                />
                <div className="mt-4 flex justify-center">
                    <Button type="submit" variant="contained" disabled={!url || !alias}> Shorten </Button> {/*not allowed to click unless both are non-empty*/}
                </div>
                {result && (
                    <p className="mt-4 text-green-600">
                        Short URL: <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
                    </p>
                )}
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </form>
        </div>
    );
}