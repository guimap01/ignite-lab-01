export class PurchaseCreatedPayload {
  customer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
