
export const joiErrorFormat = (validationResult:any) => {
	const errors = validationResult.error.details.reduce((acc:any, detail:any) => {
		acc[detail.path[0]] = detail.message.replace(/"/g, '');
		return acc;
	}, {});
	return errors;
}