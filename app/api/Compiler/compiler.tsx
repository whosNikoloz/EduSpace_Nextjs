const compile_API = "https://192.168.1.68:45456/api/CodeCompiler/";

const CompilerApi = () => {
  const compilecsharp = async (
    code: string,
    language: string,
    input: string
  ) => {
    try {
      const response = await fetch(compile_API + "compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          input,
        }),
      });

      if (response.ok) {
        // Request was successful, parse the JSON response
        const data = await response.json();

        if (data.success === true) {
          // Successful response
          return { success: true, result: data.output };
        } else {
          // Unsuccessful response with an error message
          return { success: false, error: "Compilation failed: " + data.error };
        }
      } else {
        // Response status is not OK (e.g., 404, 500, etc.)
        const errorText = await response.json();
        return { success: false, error: "API error: " + errorText.error };
      }
    } catch (error) {
      // An error occurred while making the request or handling the response
      return { success: false, error: "Request error: " + error };
    }
  };

  return {
    compilecsharp,
  };
};

export default CompilerApi;
