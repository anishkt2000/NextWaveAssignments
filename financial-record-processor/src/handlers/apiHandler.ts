// import { APIGatewayProxyHandler } from 'aws-lambda';
// import { validateInput } from '../utils/validation';
// import { anonymizeData } from '../services/anonymizationService';
// import { assessRisk } from '../services/riskAssessmentService';
// import { enrichData } from '../services/dataEnrichmentService';
// import { storeData } from '../services/storageService';

// export const apiHandler: APIGatewayProxyHandler = async (event) => {
//   try {
//     if (!event.body) {
//       throw new Error('Missing request body');
//     }

//     const data = JSON.parse(event.body);
//     validateInput(data);

//     const anonymizedData = await anonymizeData(data);
//     const enrichedData = await enrichData(anonymizedData);
//     const riskAssessment = await assessRisk(enrichedData);
//     const storedResult = await storeData({ ...enrichedData, riskAssessment });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: 'Data processed successfully', id: storedResult.id }),
//     };
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Internal server error' }),
//     };
//   }
// };