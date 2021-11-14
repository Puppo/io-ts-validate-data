import {
  InsertProductDto,
  ProductDto,
  ProductFilterQuery,
  ProductId,
  UpdateProductDto,
} from "./model";

const data: ProductDto[] = [
  {
    id: 1,
    name: "Product 1",
    color: "Red",
  },
  {
    id: 2,
    name: "Product 2",
    color: "Blue",
  },
  {
    id: 3,
    name: "Product 3",
    color: "Brown",
  },
];

export function get(query: ProductFilterQuery): ProductDto[] {
  return data.filter(p => {
    if (query.search && p.name.indexOf(query.search) === -1) {
      return false;
    }

    if (query.color && p.color.toLowerCase() !== query.color.toLowerCase()) {
      return false;
    }

    return true;
  });
}

export function getById(id: ProductId): ProductDto | undefined {
  return data.find(p => p.id === id);
}

export function add(product: InsertProductDto): ProductDto {
  const newProduct: ProductDto = {
    id: Math.max(...data.map(p => p.id)) + 1,
    name: product.name,
    color: product.color,
  };
  data.push(newProduct);
  return newProduct;
}

export function update(
  id: ProductId,
  product: UpdateProductDto
): ProductDto | undefined {
  const oldProductIndex = data.findIndex(p => p.id === id);
  if (oldProductIndex === -1) return;
  data[oldProductIndex] = {
    ...data[oldProductIndex],
    ...product,
  };
  return data[oldProductIndex];
}

export function remove(id: ProductId): ProductDto | undefined {
  const productIndex = data.findIndex(p => p.id === id);
  if (productIndex === -1) return;
  const product = data[productIndex];
  data.splice(productIndex, 1);
  return product;
}
