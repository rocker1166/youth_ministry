"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Loader2, Download, Users as UsersIcon } from "lucide-react"

interface RegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading: boolean
  registrations: any[]
  eventTitle: string
  eventId: string
  onExport: (eventId: string) => void
}

export function RegistrationDialog({
  open,
  onOpenChange,
  loading,
  registrations,
  eventTitle,
  eventId,
  onExport,
}: RegistrationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[98vw] w-[98vw] h-[96vh] !max-h-[96vh] overflow-hidden flex flex-col p-8 gap-6">
        <DialogHeader className="flex-shrink-0 pb-3 border-b">
          <DialogTitle className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-neutral-900">Event Registrations</h2>
              {eventTitle && (
                <p className="text-lg font-medium text-neutral-600 mt-2">{eventTitle}</p>
              )}
            </div>
            {registrations.length > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => onExport(eventId)}
                className="flex-shrink-0 text-base"
              >
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-24 flex-1">
            <Loader2 className="animate-spin h-16 w-16 mx-auto mb-4 text-primary" />
            <p className="text-xl text-neutral-600">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-24 flex-1">
            <UsersIcon className="h-24 w-24 mx-auto mb-4 text-neutral-300" />
            <p className="text-2xl font-medium text-neutral-800 mb-2">No registrations yet</p>
            <p className="text-lg text-neutral-500">Registrations will appear here once users sign up.</p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0 gap-5">
            <div className="px-6 py-5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20 flex-shrink-0 shadow-sm">
              <p className="text-xl font-semibold text-neutral-800">
                Total Registrations: <span className="text-primary font-bold text-3xl ml-2">{registrations.length}</span>
              </p>
            </div>
            <div className="flex-1 min-h-0 border-2 rounded-2xl bg-white shadow-xl overflow-hidden">
              <div className="h-full overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-gradient-to-r from-primary/5 to-primary/10 z-10 border-b-2 border-primary/20">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[16%] font-bold text-lg py-6 px-8 text-neutral-900">Name</TableHead>
                      <TableHead className="w-[24%] font-bold text-lg py-6 px-8 text-neutral-900">Email</TableHead>
                      <TableHead className="w-[14%] font-bold text-lg py-6 px-8 text-neutral-900">Phone</TableHead>
                      <TableHead className="w-[18%] font-bold text-lg py-6 px-8 text-neutral-900">Location</TableHead>
                      <TableHead className="w-[16%] font-bold text-lg py-6 px-8 text-neutral-900">Registered On</TableHead>
                      <TableHead className="w-[12%] font-bold text-lg py-6 px-8 text-center text-neutral-900">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg: any, index: number) => (
                      <TableRow 
                        key={reg.id} 
                        className={`hover:bg-primary/5 transition-all duration-150 border-b ${
                          index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/70'
                        }`}
                      >
                        <TableCell className="font-semibold text-base py-5 px-8 text-neutral-900">
                          {reg.name || "N/A"}
                        </TableCell>
                        <TableCell className="text-base py-5 px-8 text-neutral-700">
                          {reg.email || "N/A"}
                        </TableCell>
                        <TableCell className="text-base py-5 px-8 text-neutral-700">
                          {reg.phone || "N/A"}
                        </TableCell>
                        <TableCell className="text-base py-5 px-8 text-neutral-700">
                          {reg.city && reg.state ? `${reg.city}, ${reg.state}` : reg.state || reg.city || "N/A"}
                        </TableCell>
                        <TableCell className="text-base py-5 px-8 text-neutral-700">
                          {new Date(reg.registration_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-center py-5 px-8">
                          <span
                            className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold shadow-md border-2 ${
                              reg.status === "confirmed"
                                ? "bg-green-50 text-green-700 border-green-300"
                                : "bg-yellow-50 text-yellow-700 border-yellow-300"
                            }`}
                          >
                            {reg.status?.toUpperCase()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
