//catchAsync
// takes in an async function,
// returns an anonymous function that is assigned to the route controller,
// if an error is caught in the async function it is passed to next
export default (fn) => {
  return (req, res, next) => {
    // fn(req, res, next).catch((err) => next(err));
    fn(req, res, next).catch(next);
  };
};