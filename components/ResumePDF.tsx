import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const s = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  contact: { fontSize: 10, color: '#666', marginBottom: 16 },
  section: { marginBottom: 12 },
  heading: { fontSize: 13, fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: 4, marginBottom: 6 },
  body: { fontSize: 10, lineHeight: 1.6, color: '#333' }
})

export default function ResumePDF({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.contact}>{data.email}  |  {data.phone}</Text>
        {data.summary && <View style={s.section}><Text style={s.heading}>Summary</Text><Text style={s.body}>{data.summary}</Text></View>}
        {data.experience && <View style={s.section}><Text style={s.heading}>Experience</Text><Text style={s.body}>{data.experience}</Text></View>}
        {data.education && <View style={s.section}><Text style={s.heading}>Education</Text><Text style={s.body}>{data.education}</Text></View>}
        {data.skills && <View style={s.section}><Text style={s.heading}>Skills</Text><Text style={s.body}>{data.skills}</Text></View>}
      </Page>
    </Document>
  )
}