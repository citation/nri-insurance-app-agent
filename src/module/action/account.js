export const PUT_ACCOUNT_INFORMATION = "PUT_ACCOUNT_INFORMATION";

export const putAccountInformation = (account) => ({
  type: PUT_ACCOUNT_INFORMATION,
  account: account,
});
