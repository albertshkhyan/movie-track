'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const SwaggerUIPage = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <SwaggerUI url="/api/docs" />
    </div>
  );
};
export default SwaggerUIPage;
