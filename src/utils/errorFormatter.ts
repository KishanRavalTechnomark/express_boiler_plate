

export const sequelizeErrorFormat = (error: any | any[]) => {

	const formattedErrors: { [key: string]: string[] } = {};

  if (error.errors && Array.isArray(error.errors)) {
    error.errors.forEach((validationError:{path:string, message:string}) => {
      const field = validationError.path as string;
      const message = validationError.message;
      formattedErrors[field] = formattedErrors[field] || [];
      formattedErrors[field].push(message);
    });
  }

  return formattedErrors;
}