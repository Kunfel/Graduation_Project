import { auth } from "@/auth";

export const fetchAuth = async (url: string, options: any = { method: "GET" }) => {
    let data: any = await auth();
    //console.log(data)
    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + data.token,
        },
    });
}