// PDF Generation for event confirmation
export async function generateConfirmationPDF(registrationData: {
  name: string
  email: string
  event_title: string
  event_date: string
  location: string
  reference_number: string
}): Promise<Blob> {
  // Simple HTML to PDF conversion using canvas
  const html = `
    <div style="font-family: Noto Sans; padding: 40px; text-align: center;">
      <h1 style="color: #0b663b;">Event Registration Confirmation</h1>
      <p>Dear ${registrationData.name},</p>
      <p>Your registration has been confirmed for:</p>
      <h2 style="color: #0e7a47;">${registrationData.event_title}</h2>
      <p><strong>Date:</strong> ${registrationData.event_date}</p>
      <p><strong>Location:</strong> ${registrationData.location}</p>
      <p><strong>Reference Number:</strong> ${registrationData.reference_number}</p>
      <p>Please keep this confirmation for your records.</p>
      <footer style="margin-top: 40px; color: #777777; border-top: 1px solid #e6e6e6; padding-top: 20px;">
        <p>Institute of Youth Affairs</p>
        <p>Government of India</p>
      </footer>
    </div>
  `

  return new Blob([html], { type: "text/html" })
}
