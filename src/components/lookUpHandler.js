// import dayjs from "dayjs";
// import {
//     RetrieveCardsListPayload,
//     RetrieveCardsListRequest,
//     ServiceResponse
// } from "../services/virtual-cards-service.models";
// import {VirtualCardService} from "../services/virtual-card-service";
// import React, {ChangeEvent} from "react";
//
// type RetrieveVirtualCardParams = {
//     shipCode: string;
//     sailDate: string;
//     passengerId: string;
// }
//
// type VirtualCardsList = {
//     virtualCardNumber: string;
//     cardToken: string;
//     expirationDate: string;
//     cardholderName: string;
// }[];
//
// type VirtualCardsResponse = {
//     virtualCardList?: VirtualCardsList;
//     errorMessage?: string;
// };
//
// let serviceInstance: VirtualCardService;
//
// /**
//  * State and business logic handler for Virtual cards lookup.
//  */
// export function useLookUpHandler() {
//     //const [virtualCardRows, setVirtualCardRows] = React.useState<GridRowsProp<VirtualCardRows>>([]);
//     const [virtualCardLookupResult, setVirtualCardLookupResult] = React.useState<String>(null);
//     const [showLoader, setShowLoader] = React.useState<boolean>(false);
//     const [errorMessage, setErrorMessage] = React.useState<string>(null);
//     const submitHandler = (e: ChangeEvent<any>) => {
//         e.preventDefault();
//         const form = e.target;
//         setShowLoader(true);
//         setErrorMessage(null);
//         setVirtualCardLookupResult(null);
//        
//         const virtualCardToLookUp = form.elements['virtual-card'].value;
//        
//         getVirtualCards({
//             shipCode: form.elements['ship-code'].value,
//             sailDate: form.elements['sail-date'].value,
//             passengerId: form.elements['passenger-id'].value
//         }).then(virtualCardsRes => {
//             if (virtualCardsRes.errorMessage !== undefined) {
//                 setErrorMessage(virtualCardsRes.errorMessage);
//             } else {
//                 // const rows: VirtualCardRows[] = virtualCardsRes
//                 //     .virtualCardList
//                 //     .map(vc => ({
//                 //         id: vc.virtualCardNumber,
//                 //         cardToken: vc.cardToken,
//                 //         expirationDate: formatExpirationDate(vc.expirationDate),
//                 //         cardholderName: vc.cardholderName
//                 //     }));
//                 //
//                 // setVirtualCardRows(rows);
//                
//                 const lookupCard = virtualCardsRes.virtualCardList
//                     .find(vc => vc.virtualCardNumber === virtualCardToLookUp);
//                
//                 if (lookupCard !== undefined) {
//                     setVirtualCardLookupResult(lookupCard.cardToken);
//                 } else {
//                     setErrorMessage('No virtual card found for the provided input parameters.');
//                 }
//             }
//             setShowLoader(false);
//         });
//     };
//    
//     const clearHandler = (callback: any) =>
//         (e: ChangeEvent<any>) => {
//             e.preventDefault();
//             callback();
//             setErrorMessage(null);
//             setVirtualCardLookupResult(null);
//         };
//    
//     return {
//         virtualCardLookup: virtualCardLookupResult,
//         loader: showLoader,
//         errorMessage: errorMessage,
//         onSubmit: submitHandler,
//         onClear: clearHandler
//     }
// }
//
// /**
//  * Retrieve the list of virtual cards based on the provided request parameter.
//  *
//  * @param req - {@link RetrieveVirtualCardParams}.
//  */
// async function getVirtualCards(req: RetrieveVirtualCardParams): Promise<VirtualCardsResponse> {
//     serviceInstance = serviceInstance === undefined ? VirtualCardService.getInstance() : serviceInstance;
//     const serviceRequest = toServiceRequest({...req, sailDate: convertToServiceSailDateFormat(req.sailDate)});
//     let virtualCardResponse: VirtualCardsResponse = {};
//     try {
//         const response = await serviceInstance.retrieveCardList(serviceRequest);
//         if (response.payload !== undefined) {
//             if (response.payload.virtualCards === undefined
//                 || response.payload.virtualCards.length === 0) {
//                 virtualCardResponse.errorMessage = `No record found for passenger ID: ${req.passengerId}`;
//             } else {
//                 virtualCardResponse.virtualCardList = toVirtualCardsList(response);
//             }
//         } else if (response.error !== undefined) {
//             virtualCardResponse.errorMessage = response.error.message;
//         }
//        
//         return virtualCardResponse;
//        
//     } catch (errResponse) {
//         console.error('An error occurred when trying to retrieve Virtual Cards.', errResponse);
//         return {
//             errorMessage: errResponse.error?.userMessage || errResponse
//         };
//     }
//    
// }
//
// const toServiceRequest = (req: RetrieveVirtualCardParams): RetrieveCardsListRequest => {
//     return {
//         shipCode: req.shipCode,
//         sailDate: req.sailDate,
//         passengerId: req.passengerId
//     }
// }
//
// const toVirtualCardsList = (response: ServiceResponse<RetrieveCardsListPayload>): VirtualCardsList => {
//     if (response.payload !== undefined && response.payload.virtualCards !== undefined) {
//         return response.payload.virtualCards.map(vc => ({
//             virtualCardNumber: vc.virtualCardNumber,
//             cardToken: vc.cardToken,
//             expirationDate: vc.expirationDate,
//             cardholderName: vc.cardholderName
//         }));
//     }
//    
//     return [];
// }
//
// const convertToServiceSailDateFormat = (sailDate: string): string => {
//     const sd = dayjs(sailDate, 'MM/DD/YYYY');
//     return `${sd.year()}${formatTwoDigit(sd.month() + 1)}${formatTwoDigit(sd.date())}`;
// }
//
// const formatTwoDigit = (val: number): string => {
//     return ('0'.concat((val).toString())).slice(-2);
// }
//
// // const formatExpirationDate = (expDate: string): string => {
// //     let month = expDate.slice(4);
// //     let year = expDate.slice(0, 4);
// //
// //     return `${month}/${year}`;
// // }
