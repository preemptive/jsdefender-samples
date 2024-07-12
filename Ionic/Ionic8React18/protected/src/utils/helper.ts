export const getHTTPRequestHandler = async (type: string, setData: any, setLoader: any) => {
    try {
        const response = await fetch(`https://dummyjson.com/${type}`);
        const data = await response.json();
        console.log(data);
        setData(data[type]);
        setLoader(false);   
    } catch (error) {
        console.log(error)
    }
    
}
