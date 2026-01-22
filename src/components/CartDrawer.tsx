import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/auth";
import { ordersAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  master: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckout, setIsCheckout] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    address: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = auth.getUser();
    if (!user) {
      toast({
        title: "Необходима авторизация",
        description: "Войдите или зарегистрируйтесь для оформления заказа",
        variant: "destructive",
      });
      navigate('/login');
      onClose();
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const result = await ordersAPI.createOrder(
        user.id,
        orderItems,
        total,
        deliveryMethod === 'delivery' ? formData.address : 'Самовывоз из центра «БАЗА»',
        deliveryMethod,
        paymentMethod
      );

      if (result.success) {
        toast({
          title: "Заказ оформлен!",
          description: `Заказ #${result.order_id} успешно создан. Проверьте личный кабинет.`,
        });
        onClearCart();
        setFormData({ address: "", comment: "" });
        setIsCheckout(false);
        onClose();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось создать заказ",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при оформлении заказа",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-black uppercase">
            {isCheckout ? "Оформление заказа" : "Корзина"}
          </SheetTitle>
          <SheetDescription>
            {isCheckout
              ? "Заполните данные для доставки"
              : `Товаров в корзине: ${items.length}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-120px)] mt-6">
          {!isCheckout ? (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-card border border-border rounded animate-fade-in"
                    >
                      <div className="w-20 h-20 shrink-0 overflow-hidden bg-muted rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold mb-1 truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Мастер: {item.master}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                        <p className="font-black text-primary text-lg">
                          {(item.price * item.quantity).toLocaleString()}₽
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border pt-4 mt-4 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold">ИТОГО:</span>
                    <span className="font-black text-primary text-2xl">
                      {total.toLocaleString()}₽
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    size="lg"
                    onClick={() => setIsCheckout(true)}
                  >
                    ОФОРМИТЬ ЗАКАЗ
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex-1 overflow-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded border border-border">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="User" size={16} className="inline mr-2" />
                      Данные для доставки будут взяты из вашего профиля
                    </p>
                  </div>

                  <div>
                    <Label className="font-bold mb-3 block">СПОСОБ ПОЛУЧЕНИЯ</Label>
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="cursor-pointer">
                          Доставка курьером
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="cursor-pointer">
                          Самовывоз из центра «БАЗА»
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div>
                      <Label htmlFor="address" className="font-bold">
                        АДРЕС ДОСТАВКИ *
                      </Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="г. Нижнекамск, ул. Ленина, д. 1"
                      />
                    </div>
                  )}

                  <div>
                    <Label className="font-bold mb-3 block">СПОСОБ ОПЛАТЫ</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer">
                          Картой онлайн
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="cursor-pointer">
                          Наличными при получении
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="comment" className="font-bold">
                      КОММЕНТАРИЙ К ЗАКАЗУ
                    </Label>
                    <Input
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Дополнительная информация"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-bold text-sm">ВАШ ЗАКАЗ:</h4>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-bold">
                          {(item.price * item.quantity).toLocaleString()}₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold">ИТОГО:</span>
                    <span className="font-black text-primary text-2xl">
                      {total.toLocaleString()}₽
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 font-bold"
                      onClick={() => setIsCheckout(false)}
                    >
                      НАЗАД
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                      disabled={loading}
                    >
                      {loading ? 'ОФОРМЛЯЕМ...' : 'ПОДТВЕРДИТЬ'}
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};