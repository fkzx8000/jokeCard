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

        // ביצוע הבקשה לשירות
        Servis({
            method: 'get', // שיטת הבקשה היא GET
            signal: controller.signal, // הגדרת אפשרות לביטול הבקשה
            ...requestConfig, // שילוב קונפיגורציות נוספות אם ניתנו
        })
        .then(response => {
            // הפקת הנתונים מהתגובה ועדכון האובייקט והסטייט
            const { setup, punchline, type, id } = response.data;
            ObjJokeDit.setup = setup;
            ObjJokeDit.punchline = punchline;
            ObjJokeDit.type = type;
            ObjJokeDit.id = id;
            setData({ setup, punchline, type, id }); // עדכון הסטייט עם הנתונים שהתקבלו
            setLoading(false); // סיום מצב הטעינה
        })
        .catch((error) => {
            if (error instanceof CanceledError) return; // אם הבקשה בוטלה, לא לטפל בשגיאה
            console.error('Error fetching joke:', error); // הצגת השגיאה בקונסול
            setError('Error fetching joke'); // עדכון הסטייט של השגיאה
            setLoading(false); // סיום מצב הטעינה
        });

        return () => controller.abort(); // ביטול הבקשה אם הקומפוננטה מוסרת מהמסך
    }, deps ? [...deps] : []); // הגדרת תלות ב-`deps` עבור הפעלת ה-useEffect מחדש

    // החזרת הערכים לשימוש בקומפוננטות אחרות
    return { isLoading, data, error }
}

export default useData; // ייצוא הפונקציה לשימוש בקומפוננטות אחרות
