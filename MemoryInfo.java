import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;

public class MemoryInfo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long maxMemory = runtime.maxMemory();
        
        MemoryUsage heapMemoryUsage = memoryBean.getHeapMemoryUsage();
        MemoryUsage nonHeapMemoryUsage = memoryBean.getNonHeapMemoryUsage();
        
        System.out.println("Total Memory: " + formatBytes(totalMemory));
        System.out.println("Free Memory: " + formatBytes(freeMemory));
        System.out.println("Max Memory: " + formatBytes(maxMemory));
        System.out.println("Used Memory: " + formatBytes(totalMemory - freeMemory));
        System.out.println("Heap Memory Usage:");
        System.out.println("  Init: " + formatBytes(heapMemoryUsage.getInit()));
        System.out.println("  Used: " + formatBytes(heapMemoryUsage.getUsed()));
        System.out.println("  Committed: " + formatBytes(heapMemoryUsage.getCommitted()));
        System.out.println("  Max: " + formatBytes(heapMemoryUsage.getMax()));
        System.out.println("Non-Heap Memory Usage:");
        System.out.println("  Init: " + formatBytes(nonHeapMemoryUsage.getInit()));
        System.out.println("  Used: " + formatBytes(nonHeapMemoryUsage.getUsed()));
        System.out.println("  Committed: " + formatBytes(nonHeapMemoryUsage.getCommitted()));
        System.out.println("  Max: " + formatBytes(nonHeapMemoryUsage.getMax()));
    }
    
    private static String formatBytes(long bytes) {
        final long K = 1024;
        final long M = K * K;
        final long G = M * K;
        
        if (bytes / G > 0) {
            return String.format("%.2f GB", (double) bytes / G);
        } else if (bytes / M > 0) {
            return String.format("%.2f MB", (double) bytes / M);
        } else if (bytes / K > 0) {
            return String.format("%.2f KB", (double) bytes / K);
        } else {
            return bytes + " Bytes";
        }
    }
}
