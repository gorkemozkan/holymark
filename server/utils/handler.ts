import type { EventHandler, EventHandlerRequest } from "h3";
import { type ObjectSchema, ValiError, parse } from "valibot";

interface Wrapper<T extends EventHandlerRequest, D> {
	eventHandler: EventHandler<T, D>;
	schema?: any;
}

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>({
	eventHandler,
	schema
}: Wrapper<T, D>): EventHandler<T, D> =>
	defineEventHandler<T>(async event => {
		const query = getQuery(event);

		try {
			if (schema) {
				parse(schema, query);
			}

			const response = await eventHandler(event);

			// @ts-ignore
			setResponseStatus(event, response?.status);

			return response;
		} catch (error: unknown) {
			if (error instanceof ValiError) {
				throw createError({
					statusCode: 422,
					data: {
						errors: error.issues.map(issue => issue)
					}
				});
			}
		}
	});
