import { Box, Button, Fade, Popper } from "@mui/material";
import { useEffect } from "react";
import { useCategories } from "../AppContext";
import { Link } from "react-router-dom";



export function CategoryExpand({category}) {

    // console.log('inside CategoryExpand ', category);
    // let subCategory = category.sub_sub_categories
    // console.log('try ', subCategory.sub_sub_sub_categories);
    return (
      <ul>
      {category.sub_sub_categories.map((subCategory, index) => (
        <li key={subCategory.id}>
          <Link href="#">{subCategory.name}</Link>
          <div style={{ display: "flex" }}>
            {subCategory.sub_sub_sub_categories.map(subSubCategory => (
              <div key={subSubCategory.id} style={{ display: "inline-block", marginRight: "10px" }}>
                <Link href="#">{subSubCategory.name}</Link>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
    );
}