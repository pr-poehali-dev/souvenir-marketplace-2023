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
import { useState } from "react";

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
}

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Заказ оформлен!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nТовары:\n${items.map((item) => `- ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()}₽`).join("\n")}\n\nИтого: ${total.toLocaleString()}₽`
    );
    setFormData({ name: "", phone: "", email: "", address: "", comment: "" });
    setIsCheckout(false);
    onClose();
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="font-bold">
                      ИМЯ *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-bold">
                      ТЕЛЕФОН *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-bold">
                      EMAIL
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.com"
                    />
                  </div>

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
                    >
                      ПОДТВЕРДИТЬ
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
