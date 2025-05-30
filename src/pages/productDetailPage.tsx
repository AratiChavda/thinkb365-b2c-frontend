// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useParams } from "react-router-dom";
// import { useState } from "react";

// const ProductDetailPage = () => {
//   const params = useParams();
//   const product = {
//     id: params.id,
//     name: "Premium Movie Library",
//     brand: { name: "StreamMax" },
//     category: { name: "Entertainment" },
//     description:
//       "Access to over 50,000 movies including new releases and classics in 4K resolution with Dolby Atmos sound.",
//     type: "streaming",
//     image: "/movie-library.jpg",
//     bundles: [
//       {
//         id: 1,
//         name: "Basic",
//         pricing: 9.99,
//         billing_period: "monthly",
//         features: ["SD Quality", "Single Device"],
//       },
//       {
//         id: 2,
//         name: "Standard",
//         pricing: 14.99,
//         billing_period: "monthly",
//         features: ["HD Quality", "2 Devices", "Download 5 titles"],
//       },
//       {
//         id: 3,
//         name: "Premium",
//         pricing: 19.99,
//         billing_period: "monthly",
//         features: ["4K Quality", "4 Devices", "Unlimited Downloads"],
//       },
//     ],
//   };

//   const relatedProducts = [
//     { id: "2", name: "Music Streaming", image: "/music.jpg" },
//     { id: "3", name: "Live Sports", image: "/sports.jpg" },
//     { id: "4", name: "Kids Content", image: "/kids.jpg" },
//   ];

//   const [selectedBundle, setSelectedBundle] = useState<number | null>(null);

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-12"
//         >
//           {/* Product Images */}
//           <div>
//             <Carousel className="w-full">
//               <CarouselContent>
//                 <CarouselItem>
//                   <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </CarouselItem>
//                 <CarouselItem>
//                   <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
//                     <span className="text-gray-400">Additional image</span>
//                   </div>
//                 </CarouselItem>
//               </CarouselContent>
//               <CarouselPrevious className="left-4" />
//               <CarouselNext className="right-4" />
//             </Carousel>
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-6">
//               <Badge variant="outline" className="mb-2">
//                 {product.category.name}
//               </Badge>
//               <motion.h1
//                 initial={{ y: -10 }}
//                 animate={{ y: 0 }}
//                 className="text-3xl font-bold text-gray-900 mb-2"
//               >
//                 {product.name}
//               </motion.h1>
//               <p className="text-gray-600">By {product.brand.name}</p>
//             </div>

//             <Separator className="my-6" />

//             <Tabs defaultValue="description" className="mb-8">
//               <TabsList>
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="features">Features</TabsTrigger>
//                 <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               </TabsList>
//               <TabsContent value="description" className="mt-6">
//                 <p className="text-gray-700">{product.description}</p>
//               </TabsContent>
//               <TabsContent value="features" className="mt-6">
//                 <ul className="space-y-3">
//                   <li className="flex items-center">
//                     <svg
//                       className="h-5 w-5 text-green-500 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     50,000+ movies and TV shows
//                   </li>
//                   <li className="flex items-center">
//                     <svg
//                       className="h-5 w-5 text-green-500 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     New releases added weekly
//                   </li>
//                   <li className="flex items-center">
//                     <svg
//                       className="h-5 w-5 text-green-500 mr-2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     Available on all devices
//                   </li>
//                 </ul>
//               </TabsContent>
//               <TabsContent value="reviews" className="mt-6">
//                 <p>Customer reviews will appear here</p>
//               </TabsContent>
//             </Tabs>

//             <Separator className="my-6" />

//             <div className="mb-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 Available Plans
//               </h3>
//               <div className="space-y-4">
//                 {product.bundles.map((bundle) => (
//                   <motion.div
//                     key={bundle.id}
//                     whileHover={{ scale: 1.01 }}
//                     className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                       selectedBundle === bundle.id
//                         ? "border-indigo-500 bg-indigo-50"
//                         : "border-gray-200"
//                     }`}
//                     onClick={() => setSelectedBundle(bundle.id)}
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h4 className="font-medium">{bundle.name}</h4>
//                         <p className="text-gray-600 text-sm">
//                           ${bundle.pricing}/{bundle.billing_period}
//                         </p>
//                       </div>
//                       <div className="flex items-center">
//                         <span
//                           className={`h-4 w-4 rounded-full border ${
//                             selectedBundle === bundle.id
//                               ? "bg-indigo-600 border-indigo-600"
//                               : "border-gray-300"
//                           }`}
//                         ></span>
//                       </div>
//                     </div>
//                     {selectedBundle === bundle.id && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         className="mt-3"
//                       >
//                         <ul className="space-y-2 text-sm">
//                           {bundle.features.map((feature, i) => (
//                             <li key={i} className="flex items-center">
//                               <svg
//                                 className="h-4 w-4 text-indigo-500 mr-2"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                               {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             <Button
//               size="lg"
//               className="w-full py-6 text-lg"
//               disabled={!selectedBundle}
//             >
//               Subscribe Now
//             </Button>
//           </div>
//         </motion.div>

//         {/* Related Products */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">
//             You Might Also Like
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((product) => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{ y: -5 }}
//                 className="group"
//               >
//                 <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="object-cover w-full h-full group-hover:scale-105 transition-transform"
//                   />
//                 </div>
//                 <h3 className="font-medium text-gray-900">{product.name}</h3>
//                 <Button variant="link" className="p-0 h-auto">
//                   View details
//                 </Button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
    const params = useParams();
  const publication = {
    id: params.id,
    name: "The Daily Chronicle",
    description: "Award-winning journalism since 1872. Your trusted source for in-depth reporting and analysis.",
    type: "newspaper",
    image: "/daily-chronicle.jpg",
    features: [
      "Investigative journalism",
      "Daily editions",
      "Opinion pieces from leading thinkers",
      "Cultural coverage",
      "Business and financial analysis"
    ],
    subscriptionOptions: [
      {
        id: "digital",
        name: "Digital Only",
        description: "Complete access to our digital platform",
        price: 9.99,
        period: "monthly",
        features: [
          "Unlimited articles",
          "Mobile app access",
          "Newsletters",
          "Archives (5 year)"
        ]
      },
      {
        id: "print",
        name: "Print + Digital",
        description: "Weekday print delivery with digital access",
        price: 24.99,
        period: "monthly",
        features: [
          "Monday-Friday print delivery",
          "Digital access",
          "Sunday magazine",
          "Archives (full)"
        ]
      },
      {
        id: "premium",
        name: "Premium Edition",
        description: "Our best offering with exclusive content",
        price: 39.99,
        period: "monthly",
        features: [
          "7-day print delivery",
          "Premium digital access",
          "Exclusive content",
          "Invites to subscriber events",
          "Archives (full)"
        ]
      }
    ],
    relatedPublications: [
      { id: "2", name: "Business Today", image: "/business-today.jpg" },
      { id: "3", name: "Weekend Review", image: "/weekend-review.jpg" },
      { id: "4", name: "Science Journal", image: "/science-journal.jpg" }
    ]
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden bg-gray-900">
        <img 
          src={publication.image} 
          alt={publication.name}
          className="object-cover w-full h-full opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {publication.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {publication.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Subscription Options */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Options</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publication.subscriptionOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      className={`h-full flex flex-col transition-all ${
                        selectedOption === option.id ? "ring-2 ring-indigo-500" : ""
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">{option.name}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="mb-6">
                          <span className="text-3xl font-bold">${option.price}</span>
                          <span className="text-gray-500">/{option.period}</span>
                        </div>
                        
                        <ul className="space-y-3">
                          {option.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full"
                          variant={selectedOption === option.id ? "default" : "outline"}
                          onClick={() => setSelectedOption(option.id)}
                        >
                          {selectedOption === option.id ? "Selected" : "Select"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Publication Details */}
            <div>
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="features">Key Features</TabsTrigger>
                  <TabsTrigger value="samples">Sample Content</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-6">
                  <div className="prose max-w-none">
                    <p>
                      The Daily Chronicle has been a trusted source of news and information for over 150 years. 
                      Our team of award-winning journalists brings you in-depth reporting on politics, business, 
                      culture, and more.
                    </p>
                    <p>
                      With a commitment to factual reporting and insightful analysis, we strive to keep our 
                      readers informed about the issues that matter most. Our editorial independence ensures 
                      that you get news without agenda.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-6">
                  <ul className="space-y-4">
                    {publication.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-3 mt-0.5">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="samples" className="mt-6">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {[1, 2, 3].map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center p-6">
                              <h3 className="text-xl font-medium mb-2">Sample Front Page {index + 1}</h3>
                              <p className="text-gray-600">This would show a sample of the publication's content</p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Subscribe Now</CardTitle>
                <CardDescription>
                  {selectedOption 
                    ? publication.subscriptionOptions.find(o => o.id === selectedOption)?.name
                    : "Select an option to continue"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedOption ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Selected Plan</h4>
                      <div className="flex justify-between">
                        <span>
                          {publication.subscriptionOptions.find(o => o.id === selectedOption)?.name}
                        </span>
                        <span className="font-medium">
                          $
                          {publication.subscriptionOptions.find(o => o.id === selectedOption)?.price}
                          /month
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Subscription Includes</h4>
                      <ScrollArea className="h-64">
                        <ul className="space-y-3">
                          {publication.subscriptionOptions
                            .find(o => o.id === selectedOption)
                            ?.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>{feature}</span>
                              </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </div>

                    <Button className="w-full mt-4" size="lg">
                      Continue to Checkout
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Please select a subscription option</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Publications */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">You May Also Like</h3>
              <div className="space-y-4">
                {publication.relatedPublications.map((pub) => (
                  <motion.div
                    key={pub.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-md bg-gray-200 overflow-hidden">
                        <img src={pub.image} alt={pub.name} className="object-cover h-full w-full" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{pub.name}</h4>
                      <Button variant="link" className="p-0 h-auto text-sm">
                        View details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;