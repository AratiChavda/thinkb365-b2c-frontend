import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

type PaymentMethodType = 'CARD' | 'UPI' | 'PAYPAL' | 'BANK';

interface AddPaymentMethodFormProps {
  onSubmit: (data: PaymentMethodFormData) => void;
  onCancel: () => void;
}

interface PaymentMethodFormData {
  method_type: PaymentMethodType;
  card_number?: string;
  card_exp_month?: string;
  card_exp_year?: string;
  card_cvc?: string;
  upi_id?: string;
  paypal_email?: string;
  bank_account_number?: string;
  bank_name?: string;
}

export function AddPaymentMethodForm({ onSubmit, onCancel }: AddPaymentMethodFormProps) {
  const [methodType, setMethodType] = useState<PaymentMethodType>('CARD');
  const [formData, setFormData] = useState<PaymentMethodFormData>({
    method_type: 'CARD'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (methodType === 'CARD') {
        if (!formData.card_number || !formData.card_exp_month || 
            !formData.card_exp_year || !formData.card_cvc) {
          throw new Error('Please fill in all card details');
        }
      } else if (methodType === 'UPI') {
        if (!formData.upi_id) {
          throw new Error('Please enter UPI ID');
        }
      } else if (methodType === 'PAYPAL') {
        if (!formData.paypal_email) {
          throw new Error('Please enter PayPal email');
        }
      } else if (methodType === 'BANK') {
        if (!formData.bank_account_number || !formData.bank_name) {
          throw new Error('Please fill in all bank details');
        }
      }

      onSubmit(formData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Something went wrong'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={methodType}
        onValueChange={(value: PaymentMethodType) => {
          setMethodType(value);
          setFormData({ method_type: value });
        }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="CARD" id="card" />
          <Label htmlFor="card">Credit/Debit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="UPI" id="upi" />
          <Label htmlFor="upi">UPI</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="PAYPAL" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="BANK" id="bank" />
          <Label htmlFor="bank">Bank Account</Label>
        </div>
      </RadioGroup>

      {methodType === 'CARD' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="card_number">Card Number</Label>
            <Input
              id="card_number"
              name="card_number"
              type="text"
              maxLength={16}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="card_exp_month">Expiry Month</Label>
              <Input
                id="card_exp_month"
                name="card_exp_month"
                type="text"
                maxLength={2}
                onChange={handleInputChange}
                placeholder="MM"
              />
            </div>
            <div>
              <Label htmlFor="card_exp_year">Expiry Year</Label>
              <Input
                id="card_exp_year"
                name="card_exp_year"
                type="text"
                maxLength={2}
                onChange={handleInputChange}
                placeholder="YY"
              />
            </div>
            <div>
              <Label htmlFor="card_cvc">CVC</Label>
              <Input
                id="card_cvc"
                name="card_cvc"
                type="text"
                maxLength={3}
                onChange={handleInputChange}
                placeholder="123"
              />
            </div>
          </div>
        </div>
      )}

      {methodType === 'UPI' && (
        <div>
          <Label htmlFor="upi_id">UPI ID</Label>
          <Input
            id="upi_id"
            name="upi_id"
            type="text"
            onChange={handleInputChange}
            placeholder="username@bank"
          />
        </div>
      )}

      {methodType === 'PAYPAL' && (
        <div>
          <Label htmlFor="paypal_email">PayPal Email</Label>
          <Input
            id="paypal_email"
            name="paypal_email"
            type="email"
            onChange={handleInputChange}
            placeholder="email@example.com"
          />
        </div>
      )}

      {methodType === 'BANK' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="bank_account_number">Account Number</Label>
            <Input
              id="bank_account_number"
              name="bank_account_number"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter account number"
            />
          </div>
          <div>
            <Label htmlFor="bank_name">Bank Name</Label>
            <Input
              id="bank_name"
              name="bank_name"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter bank name"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Payment Method</Button>
      </div>
    </form>
  );
}