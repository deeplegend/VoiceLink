import { baseProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  healthCheck: baseProcedure.query(async () => {
    // throw new Error("Something went wrong"); //Uncomment to demo ErrorBoundary
    return {
      status: "ok",
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
