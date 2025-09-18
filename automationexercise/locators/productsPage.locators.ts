import { Page, Locator } from "@playwright/test";

export default class ProductsPageLocators {
  readonly saleImage: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  //headers
  readonly allProductsHeader: Locator;
  readonly searchedProductsHeader: Locator;
  readonly categoryHeader: Locator;
  readonly brandsHeader: Locator;

  //products list
  readonly productImage: Locator;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly viewProductLink: Locator;
  readonly addToCartButton: Locator;

  //category list
  readonly womenCategory: Locator;
  readonly menCategory: Locator;
  readonly kidsCategory: Locator;
  readonly womenDress: Locator;
  readonly womenTops: Locator;
  readonly womenSarees: Locator;
  readonly menTshirts: Locator;
  readonly menJeans: Locator;
  readonly kidsDress: Locator;
  readonly kidsTopsAndShirts: Locator;

  constructor(page: Page) {
    this.saleImage = page.locator("#sale_image");
    this.searchBox = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.allProductsHeader = page.getByRole("heading", {
      name: "All Products",
    });
    this.searchedProductsHeader = page.getByRole("heading", {
      name: "Searched Products",
    });
    this.categoryHeader = page.getByRole("heading", { name: "Category" });
    this.brandsHeader = page.getByRole("heading", { name: "Brands" });

    this.productImage = page.locator(".productinfo img");
    this.productName = page.locator(".productinfo p");
    this.productCategory = page.locator(".productinfo h2");
    this.productPrice = page.locator(".add-to-cart");
    this.viewProductLink = page.locator(".choose a");
    this.addToCartButton = page
      .getByRole("button", { name: "Add to cart" });
      
  }
}
