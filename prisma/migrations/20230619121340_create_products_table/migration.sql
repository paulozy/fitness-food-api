-- CreateTable
CREATE TABLE "products" (
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "imported_t" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created_t" TEXT NOT NULL,
    "last_modified_t" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "labels" TEXT NOT NULL,
    "cities" TEXT NOT NULL,
    "purchase_places" TEXT NOT NULL,
    "stores" TEXT NOT NULL,
    "ingredients_text" TEXT NOT NULL,
    "traces" TEXT NOT NULL,
    "serving_size" TEXT NOT NULL,
    "serving_quantity" TEXT NOT NULL,
    "nutriscore_score" TEXT NOT NULL,
    "nutriscore_grade" TEXT NOT NULL,
    "main_category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("code")
);
