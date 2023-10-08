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
        console.log(data);

        if (data.success === true) {
          // Successful response
          return data.output;
        } else {
          // Unsuccessful response with an error message
          console.error("API error:", data.error); // Log the error
          // Display an error message to the user or handle it as needed
          return data.output;
        }
      } else {
        // Response status is not OK (e.g., 404, 500, etc.)
        const errorText = await response.json();
        console.error("API error:", errorText.output); // Log the error
        // Display an error message to the user or handle it as needed
        return errorText.output;
      }
    } catch (error) {
      // An error occurred while making the request
      console.error("Request error:", error); // Log the error
      // Display an error message to the user or handle it as needed
      return error;
    }
  };

  return {
    compilecsharp,
  };
};

export default CompilerApi;
