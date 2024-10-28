import path from 'path';
import fs from 'fs';
import YAML from 'yamljs';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.resolve('./src/docs/swagger.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const swaggerDocument = YAML.parse(fileContents);

  return NextResponse.json(swaggerDocument);
}
