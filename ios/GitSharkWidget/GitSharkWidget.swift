/*
See LICENSE folder for this sample’s licensing information.

Abstract:
A widget that shows the avatar for a single character.
*/

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    public typealias Entry = SimpleEntry

    public func snapshot(with context: Context, completion: @escaping (SimpleEntry) -> Void) {
        let entry = SimpleEntry(date: Date())
        
        completion(entry)
    }

    public func timeline(with context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
        let entries = [SimpleEntry(date: Date())]
        let timeline = Timeline(entries: entries, policy: .atEnd)

        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    public let date: Date
}

struct PlaceholderView: View {
    var body: some View {
      GitSharkWidgetEntryView(entry: SimpleEntry(date: Date()))
    }
}

extension Color {
    init(hex: Int, alpha: Double = 1) {
        let components = (
            R: Double((hex >> 16) & 0xff) / 255,
            G: Double((hex >> 08) & 0xff) / 255,
            B: Double((hex >> 00) & 0xff) / 255
        )
        self.init(
            .sRGB,
            red: components.R,
            green: components.G,
            blue: components.B,
            opacity: alpha
        )
    }
}

struct GitSharkWidgetEntryView: View {
    var entry: Provider.Entry
    
    @Environment(\.widgetFamily) var family

    @ViewBuilder
    var body: some View {
        switch family {
        case .systemSmall:
            ZStack {
                Text("Smol")
            }
        default:
            HStack {
                ForEach(1 ..< 4) { result in
                    Link(destination: URL(string: "https://www.example.com/TOS.html")!) {
                        VStack() {
                            VStack {
                                Text("GitShark")
                                    .font(.custom("Rubik-Medium", size: 16))
                                    .fontWeight(.medium)
                                HStack {
                                    HStack {
                                        Image(systemName: "arrow.up")
                                            .font(.system(size: 14))
                                        Text("4")
                                    }
                                    HStack {
                                        Image(systemName: "arrow.down")
                                            .font(.system(size: 14))
                                        Text("9")
                                    }
                                }                                        .font(.custom("Rubik-Medium", size: 14))
                            }
                            .foregroundColor(Color(hex: 0x132A58))
                            Divider()
                            VStack {
                                HStack {
                                    Text("48").bold()
                                        .font(.custom("Rubik-Medium", size: 14))
                                    Text("changes")
                                        .font(.custom("Rubik-Regular", size: 14))
                                        .opacity(0.6)
                                }
                                HStack {
                                    Text("27").bold()
                                        .font(.custom("Rubik-Medium", size: 14))
                                    Text("branches")
                                        .font(.custom("Rubik-Regular", size: 14))
                                        .opacity(0.6)
                                }
                            }
                            .foregroundColor(Color(hex: 0x132A58))
                        }
                    }
                }
            }
        }
    }
}

struct GitSharkWidget: Widget {
  private let kind: String = "GitSharkWidget"

  public var body: some WidgetConfiguration {
      StaticConfiguration(kind: kind, provider: Provider(), placeholder: PlaceholderView()) { entry in
          GitSharkWidgetEntryView(entry: entry)
      }
      .configurationDisplayName("Repo List")
      .description("See your favorite repositories.")
      .supportedFamilies([.systemSmall, .systemMedium])
  }
}

struct Widget_Previews: PreviewProvider {
    static var previews: some View {
        Group {
          GitSharkWidgetEntryView(entry: SimpleEntry(date: Date()))
                .previewContext(WidgetPreviewContext(family: .systemMedium))
        }
    }
}
