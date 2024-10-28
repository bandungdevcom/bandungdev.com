import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    position: "relative",
  },
  container: {
    width: "100vw",
    height: "100vh",
  },
  backgroundImage: {
    height: "100vh",
    width: "70vw",
    position: "absolute",
    objectFit: "contain",
    objectPosition: "top right",
    opacity: 0.05,
    top: 0,
    right: 0,
    zIndex: 1,
  },
  section: {
    margin: "20 30",
    padding: 20,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 10,
  },
  title: {
    fontSize: "30px",
  },
  bandungDevIcon: {
    width: "200px",
    height: "50px",
    objectPosition: "center left",
    objectFit: "contain",
    marginBottom: "10px",
  },
  containerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  name: {
    fontSize: "36px",
    color: "#3C83F6",
  },
  containerContentDetail: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  containerContentFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signature: {
    height: "60px",
    width: "60px",
  },
  signatureTitle: {
    marginTop: "5px",
    fontSize: "10px",
  },
  containerVerificationCertificate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: "14px",
    gap: "4px",
  },
  url: {
    fontSize: "10px",
  },
})

interface CertificateType {
  eventName: string
  fullName: string
  date: string
  url: string
  backgroundImgBase64: string
  logoImgBase64: string
  signatureImgBase64: string
}

export function Certificate({
  eventName,
  fullName,
  date,
  url,
  backgroundImgBase64,
  logoImgBase64,
  signatureImgBase64,
}: CertificateType) {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={backgroundImgBase64} />
          <View style={styles.section}>
            <View>
              <Image style={styles.bandungDevIcon} source={logoImgBase64} />
              <Text style={styles.title}>CERTIFICATE OF ATTENDANCE</Text>
            </View>
            <View style={styles.containerContent}>
              <Text>This certificate is presented to</Text>
              <Text style={styles.name}>{fullName}</Text>
              <View style={styles.containerContentDetail}>
                <Text>for attending {eventName}</Text>
                <Text>{date}</Text>
              </View>
            </View>
            <View style={styles.containerContentFooter}>
              <View>
                <Image style={styles.signature} source={signatureImgBase64} />
                <Text>M. Haidar Hanif</Text>
                <Text style={styles.signatureTitle}>Lead BandungDev</Text>
              </View>
              <View style={styles.containerVerificationCertificate}>
                <Text>Certificate verification</Text>
                <Text style={styles.url}>{url}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
