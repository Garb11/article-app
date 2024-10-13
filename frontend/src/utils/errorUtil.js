export const unknownError = `Something went wrong`;

export function errorHandle(error, preload) {
  let errors = [];
  if (error.response) {
    // Errors status (4xx, 5xx)
    if (error.response.data && error.response.data.errors) {
      // BACKEND errors received
      errors = error.response.data.errors.map((err) => err.msg);
    } else {
      // Other erorrs (error.response.status , error.response.statusText)
      errors.push(unknownError);
    }
  } else if (error.request) {
    // No response received
    errors.push("No response received from the server");
  } else {
    // error.message
    errors.push(unknownError);
  }

  return errors;
}

export async function errorWrapperAction(f, preload) {
  try {
    await f();
  } catch (err) {
    const errors = errorHandle(err, preload);
    throw errors;
  }
}
