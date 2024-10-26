<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    function addProduct(Request $req)
    {
        $product = new Product;
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product->description = $req->input('description');
        $product->file_path = $req->file('file')->store('products');
        $product->save();
        return $product;
    }
    function list()
    {
        return Product::all();
    }

    function product($id)
    {
        $product = Product::find($id);

        if ($product) {
            return $product;
        } else {
            return ["result" => "There is no product with that ID"];
        }
    }

    public function editProduct(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return ["result" => "There is no product with that ID"];
        }


        // Update product details
        // $product->name = $request->input('name');
        // $product->price = $request->input('price');
        // $product->description = $request->input('description');
        // Handle file upload
        // Update product details
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        // Handle file upload
        if ($request->hasFile('file')) {
            $file_path = $request->file('file')->store('products');
            $product->file_path = $file_path;
        }

        // Save changes
        $product->save();

        return ["result" => "Product updated successfully", "product" => $product];
    }

    function delete($id)
    {
        $result = Product::where('id', $id)->delete();

        if ($result) {
            return ["result" => "Product has been deleted"];
        } else {
            return ["result" => "There is no Product on that ID"];
        }

    }
    public function searchlist($search)
    {
        // If search text is provided, filter products
        if ($search) {
            $products = Product::where('name', 'like', '%' . $search . '%')
                                ->orWhere('price', 'like', '%' . $search . '%')
                                ->orWhere('description', 'like', '%' . $search . '%')
                                ->get();
        } else {
            // If no search text, return all products
            $products = Product::all();
        }
    
        return $products;
    }
    

}
