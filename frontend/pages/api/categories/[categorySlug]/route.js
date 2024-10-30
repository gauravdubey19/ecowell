// import { NextRequest, NextResponse } from "next/server";
// import { connectToMongoDB } from "../../../../utils/db";
// import { Categories } from "../../../../models/Categories";
// import { generateSlug } from "../../../../lib/utils";
// import Product from "../../../../models/Products";

// // Helper function to generate a unique slug
// const generateUniqueSlug = async (slug) => {
//   let uniqueSlug = slug;
//   let slugExists = await Categories.findOne({ slug: uniqueSlug });

//   let counter = 1;
//   while (slugExists) {
//     uniqueSlug = `${slug}-${counter}`;
//     slugExists = await Categories.findOne({ slug: uniqueSlug });
//     counter++;
//   }

//   return uniqueSlug;
// };

// // GET: Retrieve all products in a category
// export const GET = async (request, { params }) => {
//   const { categorySlug } = params;
//   try {
//     await connectToMongoDB();

//     const categoryProducts = await Product.find({ "category.slug": categorySlug });

//     return NextResponse.json(categoryProducts, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// };

// // PUT: Update a category by slug
// export const PUT = async (request, { params }) => {
//   const { categorySlug } = params;
//   try {
//     const { title, image_link } = await request.json();
//     console.log("Received category update:", { title, image_link });

//     await connectToMongoDB();

//     const category = await Categories.findOne({ slug: categorySlug });
//     if (!category) {
//       return NextResponse.json(
//         { error: "Category not found" },
//         { status: 404 }
//       );
//     }

//     if (title) {
//       const slugTemp = generateSlug(title);
//       const slug = await generateUniqueSlug(slugTemp);
//       category.slug = slug;
//       category.title = title;
//     }

//     if (image_link) {
//       category.image_link = image_link;
//     }

//     await category.save();

//     return NextResponse.json(
//       { message: "Category updated successfully!", category },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating category:", error);
//     return NextResponse.json(
//       { error: "Failed to update category" },
//       { status: 500 }
//     );
//   }
// };

// // DELETE: Delete a category by slug
// export const DELETE = async (request, { params }) => {
//   const { categorySlug } = params;
//   try {
//     await connectToMongoDB();

//     const category = await Categories.findOneAndDelete({ slug: categorySlug });
//     if (!category) {
//       return NextResponse.json(
//         { error: "Category not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Category deleted successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting category:", error);
//     return NextResponse.json(
//       { error: "Failed to delete category" },
//       { status: 500 }
//     );
//   }
// };