"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HistoryIcon,
  PackageIcon,
  PlaneIcon,
  ScrollTextIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/vertical-tabs";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, useState } from "react";
import { Separator } from "@/components/ui/separator";
import OrderSummaryCard from "./order-summary-card";
import BalanceCard from "./balance-card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CreateBookingForm from "./forms/create-booking-form";
import ConsignmentDetailsForm from "./forms/consignment-details.form";
import ShipperDetailsForm from "./forms/shipper-details-form";
import ProcessRatesForm from "./forms/process-rates-form";
import { toast } from "@/components/ui/use-toast";

type NewOrderModalProps = PropsWithChildren & {};

export default function NewOrderModal(props: NewOrderModalProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      shipperDetails: [{}],
    },
  });

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  const onSubmit = async (data: unknown) => {
    try {
      console.log({ data });
      setIsLoading(true);

      // Mock server interaction
      const mockServerResponse = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            message: "Order created successfully",
          });
        }, 2000); // Simulating network delay
      });

      const response = await mockServerResponse;

      toast({
        title: "Success!",
        description: "Your order has been created",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className={isFullScreen ? "w-screen h-screen max-w-none" : "max-w-5xl"}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="flex flex-row justify-between items-center space-y-0">
              <DialogTitle>New Orders</DialogTitle>
              <div className="flex flex-row items-center justify-end text-muted-foreground gap-2">
                <Button
                  onClick={toggleFullScreen}
                  variant={"ghost"}
                  size={"icon"}
                  className="w-6 h-6"
                >
                  <ArrowsPointingOutIcon className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  size={"icon"}
                  className="w-6 h-6"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
              </div>
            </DialogHeader>
            <Tabs defaultValue="create-booking">
              <div className="w-full flex flex-row gap-4 py-4">
                <div className="min-w-[220px]">
                  <Card>
                    <TabsList className="p-0 py-2  ">
                      <TabsTrigger value="create-booking">
                        <SquarePenIcon className="w-4 h-4" />
                        Create Booking
                      </TabsTrigger>
                      <TabsTrigger value="consignment-details">
                        <PlaneIcon className="w-4 h-4" />
                        Consignment Details
                      </TabsTrigger>
                      <TabsTrigger value="shipper-details">
                        <UserIcon className="w-4 h-4" />
                        Shipper Details
                      </TabsTrigger>
                      <TabsTrigger value="process-rates">
                        <PackageIcon className="w-4 h-4" />
                        Process Rates
                      </TabsTrigger>
                    </TabsList>
                    <Separator />
                    <TabsList className="p-0 py-2 ">
                      <TabsTrigger disabled value="activity-log">
                        <HistoryIcon className="w-4 h-4" />
                        Activity Log
                      </TabsTrigger>
                    </TabsList>
                  </Card>
                </div>
                <div className="flex-1">
                  <TabsContent value="create-booking" asChild>
                    <CreateBookingForm />
                  </TabsContent>
                  <TabsContent value="consignment-details" asChild>
                    <ConsignmentDetailsForm />
                  </TabsContent>
                  <TabsContent value="shipper-details" asChild>
                    <ShipperDetailsForm />
                  </TabsContent>
                  <TabsContent value="process-rates" asChild>
                    <ProcessRatesForm />
                  </TabsContent>
                </div>
                <div className="space-y-4 max-w-[280px]">
                  <OrderSummaryCard />
                  <BalanceCard />
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="w-full"
                  >
                    <ScrollTextIcon className="w-4 h-4" />
                    View Invoice
                  </Button>
                  <Separator />
                  <Button
                    isLoading={isLoading}
                    className="w-full"
                    type="submit"
                  >
                    Save Reservation
                  </Button>
                </div>
              </div>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
