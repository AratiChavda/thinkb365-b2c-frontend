// ComparePage.tsx
import { useLocalStorage } from "@uidotdev/usehooks";
import {subscriptionTypeLabels } from "../types/product";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ComparePage() {
  const [compareItems, setCompareItems] = useLocalStorage<any[]>("subscription-compare", []);

  if (compareItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">No items to compare</h2>
        <Link to="/products">
          <Button>Browse Plans</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Compare Plans</h1>
        <Button 
          variant="outline"
          onClick={() => setCompareItems([])}
        >
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4">Feature</th>
              {compareItems.map(item => (
                <th key={item.id} className="text-center p-4 min-w-[250px]">
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {subscriptionTypeLabels[item.type]}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Price</td>
              {compareItems.map(item => (
                <td key={item.id} className="p-4 text-center">
                  ${item.price}/mo
                </td>
              ))}
            </tr>
            {/* Add more comparison rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}