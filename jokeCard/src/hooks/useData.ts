import Servis from '../services/api-url.ts' 
import { AxiosRequestConfig, CanceledError } from "axios"; 
import { useEffect, useState } from "react"; 

export const ObjJokeDit = {
    setup: '',
    punchline: '',
    type: '',
    id: ''
}

const useData = (requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<typeof ObjJokeDit | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController(); 
        setLoading(true); 
        setError(null); 

        Servis({
            method: 'get', 
            signal: controller.signal, 
            ...requestConfig,
        })
        .then(response => {
           
            const { setup, punchline, type, id } = response.data;
            ObjJokeDit.setup = setup;
            ObjJokeDit.punchline = punchline;
            ObjJokeDit.type = type;
            ObjJokeDit.id = id;
            setData({ setup, punchline, type, id });
            setLoading(false); 
        })
        .catch((error) => {
            if (error instanceof CanceledError) return; 
            console.error('Error fetching joke:', error); 
            setError('Error fetching joke'); 
            setLoading(false); 
        });

        return () => controller.abort(); 
    }, deps ? [...deps] : []); 


    return { isLoading, data, error }
}

export default useData; 
