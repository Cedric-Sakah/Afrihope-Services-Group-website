export type EnquiryFormState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export const initialEnquiryFormState: EnquiryFormState = {
  success: false,
  message: "",
};
