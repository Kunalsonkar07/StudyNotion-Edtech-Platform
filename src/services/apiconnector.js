import axios from "axios";

export const axiosInstance = axios.create({});

export const apiconnector = async ( method , url, bodyData = null,
                 headers = null, params = null ) => {
    console.log(url);
    console.log(method);

    // Construct query parameters if any
    if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
    }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers, // Merge with provided headers
        },
    };

    // Add body data if present and method is not GET
    if (bodyData && method !== 'GET') {
        options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(url, options);

    // if (!response.status) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }

    return response.json();
};
