"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

const trekOptions = [
  { value: 372, label: "ANNAPURNA CIRCUIT TREK & TILICHO LAKE" },
  { value: 435, label: "ANNAPURNA BASE CAMP (ABC) TREK" },
  { value: 436, label: "ANNAPURNA NORTH BASE CAMP TREK" },
  { value: 437, label: "MARDI HIMAL TREK" },
  { value: 441, label: "EVEREST BASE CAMP (EBC) TREK" },
  { value: 442, label: "3 PASSES TREK WITH EBC" },
  { value: 445, label: "EVEREST BASECAMP TREK WITH GOKYO LAKE" },
  { value: 447, label: "LANGTANG VALLEY TREK" },
  { value: 449, label: "YALA PEAK (5732M)" },
  { value: 452, label: "MANASLU CIRCUIT TREK WITH TSUM VALLEY" },
  { value: 454, label: "MANASLU BASE CAMP TREK" },
  { value: 457, label: "UPPER MUSTANG TREK" },
  { value: 460, label: "DHAULAGIRI CIRCUIT TREK" },
  { value: 461, label: "KANGCHENJUNGA CIRCUIT TREK" },
  { value: 463, label: "MAKALU BASE CAMP TREK" },
  { value: 464, label: "MAKALU SHERPANI COL PASS TREK" },
  { value: 466, label: "TASHI LAPCHA PASS TREK" },
  { value: 475, label: "K2 Basecamp Trek" },
  { value: 476, label: "3 PASSES WITH EBC & LOBUCHE PEAK" },
];

const expeditionOptions = [
  { value: 346, label: "MT. EVEREST EXPEDITION (8848.86M) - SOUTH" },
  { value: 351, label: "MT. EVEREST EXPEDITION (8848.86M) - NORTH" },
  { value: 352, label: "EVEREST / LHOTSE DOUBLE 8000'ERS" },
  {
    value: 474,
    label:
      "MT. EVEREST EXPEDITION (8848.86M) with LOBUCHE PEAK (6119M) CLIMBING",
  },
  { value: 353, label: "MT. K2 EXPEDITION (8611M)" },
  { value: 356, label: "MT. K2 AND BROAD PEAK DOUBLE 8000ERS" },
  { value: 357, label: "MT. KANGCHENJUNGA EXPEDITION (8586M)" },
  { value: 358, label: "MT. LHOTSE EXPEDITION (8516M)" },
  { value: 359, label: "MT. MAKALU EXPEDITION (8485M)" },
  { value: 360, label: "MT. CHO-OYU EXPEDITION (8188M)" },
  { value: 361, label: "MT. DHAULAGIRI EXPEDITION (8167M)" },
  { value: 362, label: "MT. MANASLU EXPEDITION (8163M)" },
  { value: 364, label: "MT. NANGA PARBAT EXPEDITION (8125M)" },
  { value: 365, label: "MT. ANNAPURNA I EXPEDITION (8091M)" },
  { value: 366, label: "MT. GASHERBRUM I EXPEDITION (8080M)" },
  { value: 367, label: "MT. BROAD PEAK EXPEDITION (8051M)" },
  { value: 368, label: "MT. GASHERBRUM II EXPEDITION (8034M)" },
  { value: 369, label: "MT. SHISHA PANGMA EXPEDITION (8027M)" },
  { value: 370, label: "G-I & G-II DOUBLE 8000ERS" },
  { value: 390, label: "HIMLUNG HIMAL EXPEDITION (7126M)" },
  { value: 389, label: "BARUNTSE EXPEDITION (7129M)" },
  { value: 467, label: "BARUNTSE EXPEDITION (7129M) + MERA PEAK (6476M)" },
  { value: 385, label: "PUTHA HIUNCHULI EXPEDITION (7246M) - DHAULAGIRI VII" },
  { value: 387, label: "MT. PUMORI EXPEDITION (7145M)" },
  { value: 378, label: "MT. NUPTSE EXPEDITION (7864M)" },
  { value: 374, label: "GYACHUNG KANG EXPEDITION (7952M)" },
  { value: 382, label: "MT. GANGAPURNA EXPEDITION (7455M)" },
  { value: 388, label: "TILICHO PEAK EXPEDITION (7134M)" },
  { value: 393, label: "MT. AMADABLAM EXPEDITION (6812M)" },
  { value: 411, label: "MT. AMADABLAM + LOBUCHE PEAK [DOUBLE 6000ERS]" },
  { value: 468, label: "MT. AMADABLAM + ISLAND PEAK [DOUBLE 6000ERS]" },
  {
    value: 473,
    label: "3 PEAKS - [MERA + ISLAND + LOBUCHE] PEAK CLIMBING + EBC Trek",
  },
  {
    value: 472,
    label: "2 PEAKS - [LOBUCHE + ISLAND] PEAK CLIMBING + EBC TREK",
  },
  { value: 404, label: "LOBUCHE PEAK (6119M) + EBC TREK" },
  { value: 470, label: "LOBUCHE PEAK EXPEDITION (6119M)" },
  { value: 400, label: "ISLAND PEAK EXPEDITION (6189M) - IMJA TSE + EBC Trek" },
  { value: 471, label: "ISLAND PEAK EXPEDITION (6189M) - IMJA TSE" },
  { value: 395, label: "MERA PEAK EXPEDITION (6476M)" },
  { value: 396, label: "MT. CHOLATSE PEAK EXPEDITION (6440M)" },
  { value: 481, label: "2 PEAKS [MERA + ISLAND] PEAK CLIMBING" },
  { value: 397, label: "CHULU WEST EXPEDITION (6419M)" },
  { value: 399, label: "LARKE / LARKYA PEAK EXPEDITION (6249M)" },
  {
    value: 401,
    label: "PHARCHAMO PEAK EXPEDITION (6187M) + TASHI LAPCHA PASS",
  },
  { value: 406, label: "PISANG PEAK EXPEDITION (6091M)" },
  { value: 409, label: "DHAMPUS PEAK (THAPA PEAK) EXPEDITION (6012M)" },
  { value: 480, label: "KUSUM KANGURU EXPEDITION (6360M)" },
  { value: 478, label: "MT. ACONCAGUA EXPEDITION (6962M)" },
  { value: 482, label: "MT. VINSON (4892M) + SOUTH POLE - THE LAST DEGREE" },
  { value: 483, label: "MT. VINSON EXPEDITION (4892M)" },
  { value: 345, label: "VIP EVEREST EXPEDITION (8848.86M)" },
  { value: 479, label: "VVIP MANASLU EXPEDITION (8163M)" },
  { value: 477, label: "EVEREST CAMP-II (KHUMBU ICEFALL) EXPEDITION [6750M]" },
];

const formSchema = z.object({
  title: z.string().min(1, "Please select a title"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  contactNumber: z.string().min(5, "Contact number is required"),
  country: z.string().min(1, "Please select a country"),
  tripType: z.enum(["expedition", "trekking"]),
  expedition: z.string().min(1, "Please select an expedition/trek"),
  arrivalDate: z.date({ required_error: "Arrival date is required" }),
  departureDate: z.date({ required_error: "Departure date is required" }),
  howFoundUs: z.string().optional(),
  message: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function BookTripPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: "expedition",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log(values);
    // handle form submission
  };

  return (
    <div className="bg-gray-50">
      <div className="container max-w-3xl mx-auto py-40 px-10">
        <h1 className="text-3xl font-bold mb-8">Plan Your Adventure</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Personal Information</h2>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. +977-9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Nepal">Nepal</SelectItem>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Trip Information</h2>

              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your adventure type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="expedition" />
                          </FormControl>
                          <FormLabel>Expedition</FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="trekking" />
                          </FormControl>
                          <FormLabel>Trekking</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expedition"
                render={({ field }) => {
                  const tripType = form.watch("tripType");
                  const options =
                    tripType === "trekking" ? trekOptions : expeditionOptions;

                  return (
                    <FormItem>
                      <FormLabel>
                        {tripType === "trekking"
                          ? "Select a Trek"
                          : "Select an Expedition"}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="arrivalDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Arrival Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Select date"
                          value={
                            field.value ? format(field.value, "dd/MM/yyyy") : ""
                          }
                          readOnly
                        />
                      </FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="border rounded-md"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Departure Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Select date"
                          value={
                            field.value ? format(field.value, "dd/MM/yyyy") : ""
                          }
                          readOnly
                        />
                      </FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="border rounded-md"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="howFoundUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you find us?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Google">Google Search</SelectItem>
                        <SelectItem value="Friend">
                          Friend Recommendation
                        </SelectItem>
                        <SelectItem value="Social Media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any Questions or Requests?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>I accept the Terms and Conditions</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <Button type="submit">Submit</Button>
              <Button
                type="reset"
                variant="secondary"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
