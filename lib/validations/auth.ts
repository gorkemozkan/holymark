import { type Input, custom, email, forward, minLength, nullable, object, string, toTrimmed, length } from "valibot";

export const userEmail = string("Your email must be a string.", [
	toTrimmed(),
	minLength(1, "Please enter your email."),
	email("The email address is badly formatted.")
]);

export const userPassword = string("Your password must be a string.", [
	toTrimmed(),
	minLength(1, "Please enter your password."),
	minLength(6, "Your password must have 6 characters or more.")
]);

export const userName = string("Your name must be a string.", [minLength(1, "Please enter your name.")]);

export const otpCode = string([length(6, "OTP code is not valid as expected.")]);

export const LoginSchema = object({
	email: userEmail,
	password: userPassword
});

export const RegisterSchema = object({
	name: userName,
	email: userEmail,
	password: userPassword
});

export const ForgotPasswordSchema = object({
	email: userEmail
});

export const ResetPasswordSchema = object({
	password: userPassword,
	confirmPassword: userPassword
});

export const ChangePasswordSchema = object(
	{
		password1: userPassword,
		password2: userPassword
	},
	[
		forward(
			custom(input => input.password1 === input.password2, "The two passwords do not match."),
			["password2"]
		)
	]
);

export const ProfileEditSchema = object({
	name: nullable(userName),
	email: nullable(userEmail)
});

export type LoginInput = Input<typeof LoginSchema>;
export type RegisterInput = Input<typeof RegisterSchema>;
export type ResetPasswordInput = Input<typeof ResetPasswordSchema>;
export type ForgotPasswordInput = Input<typeof ForgotPasswordSchema>;
export type ProfileEditInput = Input<typeof ProfileEditSchema>;
