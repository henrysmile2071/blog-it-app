/**
 * Generic success response handler
 *
 * @author Henry Chen
 *
 * @param {*} body - response that needs to be returned as part of API result
 */
export default body => ({
  success: true,
  body,
});
