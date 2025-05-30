import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type DiscountType = 'percentage' | 'fixed_amount';

interface PromoCodeFormData {
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount?: number;
  min_order_amount?: number;
  start_date: Date;
  end_date: Date;
  max_uses: number;
}

export default function PromoCodesPage() {
  const [formData, setFormData] = useState<PromoCodeFormData>({
    code: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 0,
    start_date: new Date(),
    end_date: new Date(),
    max_uses: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your API call here to save the promo code
      console.log('Submitting promo code:', formData);
    } catch (error) {
      console.error('Error creating promo code:', error);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Promo Codes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Promo Code</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Promo Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter promo code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Discount Type</Label>
                <RadioGroup
                  value={formData.discount_type}
                  onValueChange={(value: DiscountType) =>
                    setFormData(prev => ({ ...prev, discount_type: value }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage">Percentage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed_amount" id="fixed_amount" />
                    <Label htmlFor="fixed_amount">Fixed Amount</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="discount_value">
                  {formData.discount_type === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                </Label>
                <Input
                  id="discount_value"
                  name="discount_value"
                  type="number"
                  value={formData.discount_value}
                  onChange={handleNumberInput}
                  min={0}
                  max={formData.discount_type === 'percentage' ? 100 : undefined}
                  required
                />
              </div>

              {formData.discount_type === 'percentage' && (
                <>
                  <div>
                    <Label htmlFor="max_discount_amount">Maximum Discount Amount (Optional)</Label>
                    <Input
                      id="max_discount_amount"
                      name="max_discount_amount"
                      type="number"
                      value={formData.max_discount_amount || ''}
                      onChange={handleNumberInput}
                      min={0}
                    />
                  </div>

                  <div>
                    <Label htmlFor="min_order_amount">Minimum Order Amount (Optional)</Label>
                    <Input
                      id="min_order_amount"
                      name="min_order_amount"
                      type="number"
                      value={formData.min_order_amount || ''}
                      onChange={handleNumberInput}
                      min={0}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.start_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.start_date ? (
                          format(formData.start_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.start_date}
                        onSelect={(date) =>
                          setFormData(prev => ({ ...prev, start_date: date || new Date() }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.end_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.end_date ? (
                          format(formData.end_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.end_date}
                        onSelect={(date) =>
                          setFormData(prev => ({ ...prev, end_date: date || new Date() }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="max_uses">Maximum Uses</Label>
                <Input
                  id="max_uses"
                  name="max_uses"
                  type="number"
                  value={formData.max_uses}
                  onChange={handleNumberInput}
                  min={0}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit">Create Promo Code</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}