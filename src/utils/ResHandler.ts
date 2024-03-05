export function ResHandler(
    res: any,
    statusCode: number,
    message: string,
    data: any
  ) {
    res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }
